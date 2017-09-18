import React from "react";
import "./style.scss";

interface AudioMediaCarouselItemProps {
    data: {
        url: string;
        name: string;
        comment?: string;
    }
}

/** Music Carousel Item component */
export class AudioMediaCarouselItem extends React.Component<AudioMediaCarouselItemProps, {}> {
    render() {
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
