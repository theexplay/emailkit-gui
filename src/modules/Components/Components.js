import React from 'react';


class Components extends React.Component {


    render() {
        const components = ['Spacer', 'Table', 'Buttons', 'Text', 'Images'];

        return (
            <div className="Components">
                <div className="Components__title">
                    <span>ADD</span>
                </div>
                <div className="Components__description">Click and drag elemenets over</div>
                <div className="Components__list">
                    {components.map((cmp, key) => {
                        return (
                            <div className="Components__item" key={key}>
                                <div className="Components__item-container">
                                    <div className="Components__item-image">
                                        <img src={`modules/Components/images/${cmp}.jpg`} alt={cmp}/>
                                    </div>
                                    <div className="Components__item-text">{cmp}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Components;


{/*<div className="Components">
    <div className="Components__title">
        <span>ADD</span>
    </div>
    <div className="Components__description">Click and drag elemenets over</div>
    <div className="Components__list">
        {components.map((cmp, key) => {
            return (
                <div className="Components__item" key={key}>
                    <div className="Components__item-container">
                        <div className="Components__item-image">
                            <img src={`modules/Components/images/${cmp}.jpg`} alt={cmp}/>
                        </div>
                        <div className="Components__item-text">{cmp}</div>
                    </div>
                </div>
            )
        })}
    </div>
</div>*/}
