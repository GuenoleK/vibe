/** carousel component :
 * Allow to display a list of data horizontally and allow scrolling.
 * item : type of list items.
 */
import React from "react";
import {Motion, spring} from "react-motion";
import {IconButton} from "material-ui";
import "./style.scss";
import {VibeIconButton} from "../vibe-icon-button/index";

interface VibeCarouselProps < T > {
    list: T[];
    SlideComponent: React.ComponentClass < any >;
    componentProps?: {};
    contentSize: {
        height: number | string;
        width: number | string;
    }
}

export class VibeCarousel < T > extends React.Component < VibeCarouselProps < T >, {
    offset : number
} > {

    constructor(props) {
        super(props);

        this.state = {
            offset: 0
        }
    }

    content;
    carouselContent;

    containerWidth = 0;
    contentWidth = 0;
    slideComponentHeight = 0;

    componentDidMount() {
        this.updateScroller();
    }

    componentDidUpdate() {
        this.updateScroller();
    }

    updateScroller() {
        if (this.carouselContent) {
            this.containerWidth = this.carouselContent.clientWidth;
        }
        if (this.content) {
            this.contentWidth = this.content.clientWidth;
        }
    }

    plusOffset = () => {
        const {offset} = this.state;
        this.setState({
            offset: Math.min(offset + this.containerWidth - 20, this.contentWidth - this.containerWidth)
        });
    }

    moinsOffset = () => {
        const {offset} = this.state;
        this.setState({
            offset: Math.max(0, offset - this.containerWidth - 2)
        });
    }

    /** Render the carousel. */
    render() {
        return (
            <div data-component="vibe-carousel">
                <VibeIconButton
                    style={{
                        backgroundColor: "white",
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        marginRight: 15
                    }}
                    iconName="keyboard_arrow_left"
                    onClick={() => this.moinsOffset()} />
                <div ref={i => this.carouselContent = i} style={{height: this.props.contentSize.height, width: this.props.contentSize.width}} data-component="vibe-carousel-content">
                    <div
                        data-component="container"
                        style={{
                        height: this.slideComponentHeight
                    }}>
                        <div data-component="handler">
                            <Motion
                                style={{
                                transform: spring(this.state.offset)
                            }}>
                                {style => (
                                    <div
                                        ref={i => this.content = i}
                                        data-component="content-list"
                                        style={{
                                        transform: `translateX(-${style.transform}px)`
                                    }}>
                                        {this.props.list.map(e => this.renderSlideComponent(e))}
                                    </div>
                                )
}
                            </Motion>
                        </div>

                    </div>
                </div>
                <VibeIconButton
                    style={{
                        backgroundColor: "white",
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        marginLeft: 15
                    }}
                    iconName="keyboard_arrow_right"
                    onClick={() => this.plusOffset()} />
            </div>
        );
    }

    renderSlideComponent(data) {
        const Line = this.props.SlideComponent;
        return <div data-component="item" ref={(i) => this.getSlideComponentHeight(i)}><Line data={data} {...this.props.componentProps}/></div>;
    }

    getSlideComponentHeight(div) {
        if (this.slideComponentHeight === 0) {
            this.slideComponentHeight = div.clientHeight + 150;
        }
    }
}
