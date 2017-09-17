import React from "react";
import "./style.scss";

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
                <audio controls preload="metadata">
                    <source src={this.props.data.url} type="audio/mpeg" />>
                    Your browser does not support the audio element.
                </audio>
            </div>
        )
    }
}
