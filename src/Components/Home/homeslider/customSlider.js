import React from "react";
import { Carousel } from "react-bootstrap";
import "./customSlider.css";
import images from "../../../data/images";

function CustomCarousel({ children }) {
  return (
    <Carousel>
      {React.Children.map(children, (item, index) => (
        <Carousel.Item key={index}>
          <div className="slider_item">{item}</div>

          <Carousel.Caption key={index}>
            <h3>{images[index].title}</h3>
            <p>{images[index].description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CustomCarousel;
// const [activeIndex, setActiveIndex] = useState(0);
// const [slideDone, setSlideDone] = useState(true);
// const [timeID, setTimeID] = useState(null);
// const slideNext = useCallback(() => {
//   setActiveIndex((val) => {
//     if (val >= children.length - 1) {
//       return 0;
//     } else {
//       return val + 1;
//     }
//   });
// }, [children.length]);
// useEffect(() => {
//   if (slideDone) {
//     setSlideDone(false);
//     setTimeID(
//       setTimeout(() => {
//         slideNext();
//         setSlideDone(true);
//       }, 5000)
//     );
//   }
// }, [slideDone, slideNext]);

// const slidePrev = () => {
//   setActiveIndex((val) => {
//     if (val <= 0) {
//       return children.length - 1;
//     } else {
//       return val - 1;
//     }
//   });
// };

// const AutoPlayStop = () => {
//   if (timeID > 0) {
//     clearTimeout(timeID);
//     setSlideDone(false);
//   }
// };

// const AutoPlayStart = () => {
//   if (!slideDone) {
//     setSlideDone(true);
//   }
// };

// return (
//   <div
//     className="container__slider"
//     onMouseEnter={AutoPlayStop}
//     onMouseLeave={AutoPlayStart}
//   >
//     {children.map((item, index) => {
//       return (
//         <div
//           className={"slider__item slider__item-active-" + (activeIndex + 1)}
//           key={index}
//         >
//           {item}
//         </div>
//       );
//     })}

//     <div className="container__slider__links">
//       {children.map((item, index) => {
//         return (
//           <button
//             key={index}
//             className={
//               activeIndex === index
//                 ? "container__slider__links-small container__slider__links-small-active"
//                 : "container__slider__links-small"
//             }
//             onClick={(e) => {
//               e.preventDefault();
//               setActiveIndex(index);
//             }}
//           ></button>
//         );
//       })}
//     </div>

//     <button
//       className="slider__btn-next"
//       onClick={(e) => {
//         e.preventDefault();
//         slideNext();
//       }}
//     >
//       {">"}
//     </button>
//     <button
//       className="slider__btn-prev"
//       onClick={(e) => {
//         e.preventDefault();
//         slidePrev();
//       }}
//     >
//       {"<"}
//     </button>
//   </div>
// );
// }
