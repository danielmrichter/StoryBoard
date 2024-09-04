import { useDispatch } from "react-redux";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";


export default function AddCards({projectId}) {
    const dispatch = useDispatch()
    const handleClick = (cardType) => {
        dispatch({type: 'ADD_CARD', payload: {cardType, projectId}})
    }
    const cards = [{
        i: 'text', x: 1, y: 1, h: 1, w: 1
    }]
  return (
    // <ResponsiveGridLayout
    //     className="layout"
    //     breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    //     compactType='vertical'
    //     layout={cards}
    //     cols={{ lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 }}
    //     rowHeight={100}
    //     width={200}
    //   >
    //     {cards.map(card => {
    //         <button style={{backgroundColor: "black"}} key={card.i}>{card.i}</button>
    //     })}
    // </ResponsiveGridLayout>
    <div>
        <button onClick={() => handleClick( 'text')}>Text</button>
    </div>
  );
}
