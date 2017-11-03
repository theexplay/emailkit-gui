import React from 'react';
import PropTypes from 'prop-types';
import Components from '../Components/Components';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const getItems = count =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`,
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => Object.assign(
    {
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        marginBottom: grid,
        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

    },
    // styles we need to apply on draggables
    draggableStyle
);

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    marginBottom: grid,
    width: 250,
});

class Constructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(10),
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        console.log(result)

        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items,
        });
    }

    render() {
        return (
            <div className="Constructor">
                <div className="Constructor__sidebar">
                    <div className="Constructor__add-components">
                        <Components/>
                    </div>
                </div>
                <div className="Constructor__main">
                    <div className="Constructor__area">

                    </div>
                </div>
            </div>
        )
    }
}

export default Constructor;
