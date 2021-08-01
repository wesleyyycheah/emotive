import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function Mouth(props: SvgProps) {
  return (
    <Svg viewBox="0 0 323 219" {...props}>
      <Path
        fill="#000"
        d="M268.2 1.1c-10.7 1.6-24.6 6.6-29.2 10.4-2.2 1.9-6.9 5.1-10.3 7.1-3.4 2.1-9.3 5.9-13.2 8.5-10.9 7.3-15.9 9.4-36.1 15.2-27.2 7.9-35.9 9.4-76 13.3-17.2 1.7-18.9 1.7-36.5 0-26.1-2.4-29.4-3-45.1-7.6-19.2-5.8-24.2-4.8-20.3 4.1C4.9 59.5 9 62.2 27.4 68.6 35 71.2 62.8 77 68 77c.5 0 .6 2.6.4 5.7-1.6 18.5-2.6 23.6-8.4 41.3-8.2 25.2-8.8 28.6-6.6 39.7 2.3 12.2 9.3 26 16.1 31.9 2.7 2.4 5.8 4.4 6.9 4.4 1 0 5.1 1.5 9 3.4 13.2 6.3 24.4 9.7 35.6 10.7 5.8.5 12.3 1.4 14.5 1.9 6.2 1.6 56.4 3.2 63.2 2.1 32.2-5.3 47.2-9 57.8-14.1 12.9-6.2 29.7-22.5 41-39.7 13.5-20.5 19.9-34 23.2-49.6 2.5-11.6 2.5-49.8-.1-64.2-3.3-18.4-9.3-32-18.3-41.7-6.4-6.8-20-9.9-34.1-7.7zm16.5 23.4c6.6 2.7 10.5 11 12.8 27.5.7 5.2 1.1 9.8.9 10.1-.2.4-4.6 2.4-9.6 4.4-5.1 2-12.4 5.2-16.3 7-36.3 17.3-42.4 19.8-66.9 27.9-20.1 6.7-28.7 8.4-50.7 10.2-11.9.9-28.2-.3-27.5-2.1.3-.8 1-5.1 1.6-9.7 1.2-9 3.9-23 4.5-23.6.2-.3 5.1-1.3 10.9-2.3 20-3.6 51.1-14.3 68.5-23.6 5.8-3 17.8-10 26.7-15.4 12.8-7.8 17-9.9 20.1-10 2.1 0 4.7-.4 5.8-.9 3.3-1.4 15.2-1.1 19.2.5zM299 84.7c0 12.1-2.3 26.8-5.3 34.2-3.5 8.4-17.7 30.7-24.7 38.6-9.7 11.1-20.7 20.3-28.4 24-3.9 1.9-15.8 5.7-26.3 8.4-18.6 4.9-19.7 5.1-32.5 5.1-7.3 0-16.5-.5-20.4-1-10.4-1.3-24.9-4.1-26.3-5-1-.5-.8-1.9.8-5.6 7.4-17.7 11.3-30.7 13.2-43.4.7-5.2 1.6-8 2.4-8 3.8 0 31.4-4.2 39.9-6 12.7-2.8 35-10.7 49.1-17.4 6.1-2.9 17.2-9.6 25-15 11.9-8.4 29.9-18.6 32.7-18.6.4 0 .8 4.4.8 9.7z"
      />
    </Svg>
  );
}

export default Mouth;
