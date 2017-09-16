import React from "react";
import Audio from 'react-audioplayer';
import "./style.scss";
import AudioPlayer from 'react-h5-audio-player';

interface AudioMediaCarouselItemProps {
    data: {
        url: string;
        displayText: string
    }
}

/** Music Carousel Item component */
export class AudioMediaCarouselItem extends React.Component<AudioMediaCarouselItemProps, {}> {
    render() {
        console.log("ELEMENT", this.props.data);
        return(
            <div data-component="audio-media-item">
                <AudioPlayer src={this.props.data.url} />
            </div>
        )
    }
}
