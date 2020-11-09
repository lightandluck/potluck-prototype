import React from 'react';
import axios from 'axios';
import {
  Table,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell
} from '@zendeskgarden/react-tables';
import styled from 'styled-components';

const { DragDropContext, Droppable, Draggable } = require('react-beautiful-dnd');
// const GripIcon = require('@zendeskgarden/svg-icons/src/12/grip.svg').default;

const DraggableRow = styled(Row)`
  ${props =>
    props.isDraggingOver
      ? `
    :hover {
      background-color: inherit !important;
    }
  `
      : ''};
`;

class DraggableCell extends React.Component {
  constructor() {
    super();

    this.setRef = this.setRef.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (!this.ref) {
      return null;
    }

    const isDragStarting = this.props.isDragOccurring && !prevProps.isDragOccurring;

    if (!isDragStarting) {
      return null;
    }

    const { width, height } = this.ref.getBoundingClientRect();

    const snapshot = {
      width,
      height
    };

    return snapshot;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const ref = this.ref;

    if (!ref) {
      return;
    }

    if (snapshot) {
      if (ref.style.width === snapshot.width) {
        return;
      }
      ref.style.width = `${snapshot.width}px`;
      ref.style.maxWidth = `${snapshot.width}px`;
      ref.style.height = `${snapshot.height}px`;
      return;
    }

    if (this.props.isDragOccurring) {
      return;
    }

    // inline styles not applied
    if (ref.style.width == null) {
      return;
    }

    // no snapshot and drag is finished - clear the inline styles
    ref.style.removeProperty('height');
    ref.style.removeProperty('width');
    ref.style.removeProperty('maxWidth');
  }

  setRef(ref) {
    this.ref = ref;
  }

  render() {
    return <Cell ref={this.setRef}>{this.props.children}</Cell>;
  }
}

const DraggableContainer = styled.div`
  :focus {
    outline: none;
  }
`;

// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class DraggableExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offerings: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  componentDidMount() {
    axios.get('/offerings')
      .then(response => {
        this.setState({ offerings: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const offerings = reorder(this.state.offerings, result.source.index, result.destination.index);

    this.setState(
      {
        offerings
      },
      () => {
        document.getElementById(result.draggableId).focus();
      }
    );
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Table>
          <Head>
            <HeaderRow>
              <HeaderCell isMinimum />
              <HeaderCell>Title</HeaderCell>
              <HeaderCell>Player</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Official name</HeaderCell>
            </HeaderRow>
          </Head>
          <Droppable droppableId="droppable">
            {(provided, droppableSnapshot) => {
              return (
                <Body ref={provided.innerRef} isDraggingOver={droppableSnapshot.isDraggingOver}>
                  {this.state.offerings.map((offering, index) => (
                    <Draggable key={offering._id} draggableId={offering._id} index={index}>
                      {(provided, snapshot) => (
                        <DraggableRow
                          ref={provided.innerRef}
                          isDragging={snapshot.isDragging}
                          isDraggingOver={droppableSnapshot.isDraggingOver}
                          isHovered={snapshot.isDragging}
                          isFocused={
                            droppableSnapshot.isDraggingOver ? snapshot.isDragging : undefined
                          }
                          {...provided.draggableProps.style}
                          {...provided.draggableProps}
                        >
                          <DraggableCell isMinimum isDragOccurring={snapshot.isDragging}>
                            <DraggableContainer id={offering._id} {...provided.dragHandleProps}>
                              <span>:::</span>
                            </DraggableContainer>
                          </DraggableCell>
                          <DraggableCell isDragOccurring={snapshot.isDragging}>
                            {offering.title}
                          </DraggableCell>
                          <DraggableCell isDragOccurring={snapshot.isDragging}>
                            {offering.playerName}
                          </DraggableCell>
                          <DraggableCell isDragOccurring={snapshot.isDragging}>
                            {offering.description}
                          </DraggableCell>
                          <DraggableCell isDragOccurring={snapshot.isDragging}>
                            {offering.officialName}
                          </DraggableCell>
                        </DraggableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Body>
              );
            }}
          </Droppable>
        </Table>
      </DragDropContext>
    );
  }
}
<DraggableExample />;