// LucasBassetti/react-css-loaders
import styled, { keyframes } from 'styled-components'

// const loading = keyframes`
//   0%,
//   80%,
//   100% {
//     box-shadow: 0 2.5em 0 -1.3em;
//   }
//   40% {
//     box-shadow: 0 2.5em 0 0;
//   }
// `


// const Loader = styled.div`
//   animation: ${props => `${loading} ${props.duration}s infinite ease-in-out;`};
//   animation-delay: ${props => `${props.duration * -0.16}s`};
//   animation-fill-mode: both;
//   border-radius: 50%;
//   color: ${props => props.color};
//   font-size: ${props => `${props.size}px`};
//   height: 2.5em;
//   margin: 80px auto;
//   position: relative;
//   text-indent: -9999em;
//   transform: translateZ(0);
//   width: 2.5em;
//   &:before {
//     animation: ${props =>
//       `${loading} ${props.duration}s infinite ease-in-out;`};
//     animation-delay: ${props => `${props.duration * -0.32}s`};
//     animation-fill-mode: both;
//     border-radius: 50%;
//     content: '';
//     height: 2.5em;
//     left: -3.5em;
//     position: absolute;
//     top: 0;
//     width: 2.5em;
//   }
//   &:after {
//     animation: ${props =>
//       `${loading} ${props.duration}s infinite ease-in-out;`};
//     animation-fill-mode: both;
//     border-radius: 50%;
//     content: '';
//     height: 2.5em;
//     left: 3.5em;
//     position: absolute;
//     top: 0;
//     width: 2.5em;
//   }
// `

const Loader = styled.div`
  border-radius: 50%;
  color: ${props => props.color};
  font-size: ${props => `${props.size}px`};
  height: 2.5em;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  width: 2.5em;
  &:before {
    border-radius: 50%;
    content: '';
    height: 2.5em;
    left: -3.5em;
    position: absolute;
    top: 0;
    width: 2.5em;
  }
  &:after {
    border-radius: 50%;
    content: '';
    height: 2.5em;
    left: 3.5em;
    position: absolute;
    top: 0;
    width: 2.5em;
  }
`

Loader.defaultProps = {
  color: '#000',
  duration: 1.8,
  size: 6
}

export { Loader }
