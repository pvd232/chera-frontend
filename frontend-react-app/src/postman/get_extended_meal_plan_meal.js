const pm = '';
const responseBody = '';
const testScript = (() => {
  //   Postman script starts here
  function sendRequest(req) {
    return new Promise((resolve, reject) => {
      pm.sendRequest(req, (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res.json());
      });
    });
  }

  pm.test('Status code is 200', function () {
    pm.response.to.have.status(200);
  });

  const mealPlanMealsArray = JSON.parse(responseBody);
  pm.test('Body is an array', function () {
    pm.expect(mealPlanMealsArray).to.be.an('array');
  });

  (async function main() {
    for (const mealPlanMeal of mealPlanMealsArray) {
      const kCal = mealPlanMeal.k_cal;
      const proteinKCal = mealPlanMeal.protein_k_cal;
      const carbKCal = mealPlanMeal.carb_k_cal;
      const fatKCal = mealPlanMeal.fat_k_cal;
      const recipe = mealPlanMeal.recipe;

      const nutrientsToUSDAMap = new Map();
      const usdaToNutrientsMap = new Map();

      for (const nutrient of mealPlanMeal.nutrients) {
        nutrientsToUSDAMap.set(
          nutrient.nutrient_id,
          parseInt(nutrient.usda_nutrient_id)
        );
        usdaToNutrientsMap.set(parseInt(nutrient.usda_nutrient_id), nutrient);
      }
      let expectedProteinKCal = 0;
      let expectedCarbKCal = 0;
      let expectedFatKCal = 0;
      let expectedKCal = 0;

      // Set ingredient map outside of recipe
      const usdaNutrientsMap = new Map();
      for (const ingredient of recipe) {
        const fdaPortionId = ingredient.fda_portion_id;
        const usdaIngredient = await sendRequest(
          pm.environment.get('usda_base_url') +
            `/${ingredient.usda_ingredient_fdc_id}?api_key=GXPBs2wuidF2GTiSYjpOd5K5RjTzKFrd80JZTxKV`
        );
        const usdaPortions = usdaIngredient.foodPortions;

        pm.test('test usdaPortions is an array', () => {
          pm.expect(usdaPortions).to.be.an('array');
        });

        const usdaPortionsMap = new Map();

        for (const portion of usdaPortions) {
          usdaPortionsMap.set(portion.id, portion.gramWeight);
        }
        const matchingPortionGrams = usdaPortionsMap.get(
          parseInt(fdaPortionId)
        );
        const multiplier = (matchingPortionGrams * ingredient.quantity) / 100;

        pm.test('test usdaIngredient nutrients is array', () => {
          pm.expect(usdaIngredient.foodNutrients).to.be.an('array');
        });

        for (const nutrient of usdaIngredient.foodNutrients) {
          if (nutrient.amount) {
            const amountToAdd = nutrient.amount * multiplier;
            if (nutrient.nutrient.name === 'Energy') {
              expectedKCal += amountToAdd;
            }
            if (!usdaNutrientsMap.has(nutrient.nutrient.id)) {
              usdaNutrientsMap.set(nutrient.nutrient.id, amountToAdd);
            } else {
              const currentAmount = usdaNutrientsMap.get(nutrient.nutrient.id);
              usdaNutrientsMap.set(
                nutrient.nutrient.id,
                currentAmount + amountToAdd
              );
            }
          }
        }
      }
      const usdaProteinGrams = usdaNutrientsMap.get(
        nutrientsToUSDAMap.get('protein')
      );
      const usdaCarbGrams = usdaNutrientsMap.get(
        nutrientsToUSDAMap.get('carb')
      );
      const usdaFatGrams = usdaNutrientsMap.get(nutrientsToUSDAMap.get('fat'));
      expectedProteinKCal = usdaProteinGrams * 4;
      expectedCarbKCal = usdaCarbGrams * 4;
      expectedFatKCal = usdaFatGrams * 9;
      expectedKCal = Math.round(expectedKCal);

      const kCalDeficit = expectedKCal / (proteinKCal + carbKCal + fatKCal);

      expectedProteinKCal = Math.round(expectedProteinKCal * kCalDeficit);
      expectedCarbKCal = Math.round(expectedCarbKCal * kCalDeficit);
      expectedFatKCal = Math.round(expectedFatKCal * kCalDeficit);

      pm.test('kCal equals expected USDA kCal', () => {
        pm.expect(expectedKCal).to.equal(kCal);
      });

      pm.test('proteinkCal equals expected USDA protein kCal', () => {
        pm.expect(expectedProteinKCal).to.equal(proteinKCal);
      });
      pm.test('carbkCal equals expected USDA carb kCal', () => {
        pm.expect(expectedCarbKCal).to.equal(carbKCal);
      });
      pm.test('kCal equals expected USDA fat kCal', () => {
        pm.expect(expectedFatKCal).to.equal(fatKCal);
      });

      for (const nutrientId of Array.from(usdaNutrientsMap.keys())) {
        if (usdaToNutrientsMap.has(nutrientId)) {
          pm.test(
            `test nutrient ${usdaToNutrientsMap.get(nutrientId).nutrient_id}`,
            () => {
              const nutrientAmount = usdaNutrientsMap.get(nutrientId);
              pm.expect(nutrientAmount).to.equal(
                usdaToNutrientsMap.get(nutrientId).amount
              );
            }
          );
        }
      }
    }
  })();
  //   Postman script ends here
})();
