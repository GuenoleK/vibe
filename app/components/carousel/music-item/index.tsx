import React from "react";
import Audio from 'react-audioplayer';
import "./style.scss";

interface AudioMediaCarouselItemProps {
    data: {
        name: string; src: string;
        img: string; comments: string;
    }
}

/** Music Carousel Item component */
export class AudioMediaCarouselItem extends React.Component<AudioMediaCarouselItemProps, {}> {
    render() {
        return(
            <div data-component="audio-media-item">
                <Audio className="audio-player" theme={{boxShadow : "3px 3px 3px 0 rgba(0, 0, 0, 0.24)"}} width={600} height={400} playlist={[this.props.data]}/>
            </div>
        )
    }
}
