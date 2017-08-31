import React from 'react';
import Icon from '../Icon/Icon';

class Nav extends React.Component {

    renderMenuItem(data) {
        return (
            <div className="Nav__category">
                {
                    data.map((item, i) => {
                        return (
                            <div className='Nav__item' key={i}>
                                {!!item.icon ? <Icon name={item.icon}/> : null}
                                {item.title}
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    render() {
        const main = [
            {
                title: 'All emails'
            },
            {
                title: 'Add new',
            }
        ];

        const Constructor = [
            {
                title: 'All layers',
                icon: 'layer'
            },
            {
                title: 'Blocks',
                icon: 'puzzle'
            },
            {
                title: 'Mixins',
                icon: 'text'
            }
        ];

        return (
            <div className="Nav">
                <div className="Nav__category">
                    <div className="Nav__title">Main</div>
                    {this.renderMenuItem(main)}
                </div>
                <div className="Nav__category">
                    <div className="Nav__title">Building</div>
                    {this.renderMenuItem(Constructor)}
                </div>
            </div>
        )
    }
}

export default Nav;
