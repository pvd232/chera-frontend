import { useState } from 'react'
import ModalLayout from './ModalLayout'
import OrangeButton from '../../../../shared_components/OrangeButton';

export default function IngredientList({ingredientItems}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <OrangeButton
                variant="outlined"
                sx={{
                    fontSize: 'small',
                    width: 120
                }}
                onClick={() => setOpen(true)}
            >
                Ingredients
            </OrangeButton>

            <ModalLayout
                open={open}
                setOpen={setOpen}
            >                    
                <div>
                    <h2 id="modal-title">
                        <b>Ingredients</b>
                    </h2>
                    <hr/>
                    <ol id="modal-description">
                    {
                        ingredientItems.map((item, index) =>
                            <li key={index}>{item.name}</li>
                        )
                    }
                    </ol>
                </div>

            </ModalLayout>
        </>
    )
}
