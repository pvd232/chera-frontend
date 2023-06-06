class ScheduleMealCardItem {
  constructor(scheduleMealCardItemData) {
    this.id = scheduleMealCardItemData.associatedMeal.id;
    this.name = scheduleMealCardItemData.associatedMeal.name;
    this.mealTime = scheduleMealCardItemData.associatedMeal.mealTime;
    this.description = scheduleMealCardItemData.associatedMeal.description;
    this.imageUrl = scheduleMealCardItemData.associatedMeal.imageUrl;
    this.quantity = 1;
  }
}
export default ScheduleMealCardItem;
