/** carousel component :
 * Allow to display a list of data horizontally and allow scrolling.
 * item : type of list items.
 */
import React from "react";
import {Motion, spring} from "react-motion";
import {IconButton, Paper} from "material-ui";
import "./style.scss";
import {VibeIconButton} from "../vibe-icon-button/index";
import {indigo500, pink500} from 'material-ui/styles/colors';

interface VibeCarouselProps < T > {
    list: T[];
    SlideComponent: React.ComponentClass < any >;
    componentProps?: {};
    contentSize: {
        height: number | string;
        width: number | string;
    }
}

interface VibeCarouselState {
    offset: number;
    rightMoves: number;
    leftMoves: number;
}

export class VibeCarousel < T > extends React.Component < VibeCarouselProps < T >, VibeCarouselState > {

    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            rightMoves: 0,
            leftMoves: 3
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
    }

    plusOffset = () => {
        const {offset, leftMoves, rightMoves} = this.state;

        if(rightMoves < this.props.list.length - 1) {
            this.setState({
                offset: (offset + this.containerWidth) + 15,
                rightMoves: rightMoves + 1,
                leftMoves: leftMoves + 1
            });
        }
    }

    moinsOffset = () => {
        const {offset, leftMoves, rightMoves} = this.state;

        if(leftMoves > this.props.list.length - 1) {
            this.setState({
                offset: (offset - this.containerWidth) - 15,
                leftMoves: leftMoves - 1,
                rightMoves: rightMoves - 1
            });
        }
    }

    /** Render the carousel. */
    render() {
        return (
            <div data-component="vibe-carousel">
                <VibeIconButton
                    style={{
                        backgroundColor: pink500,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        marginRight: 15
                    }}
                    iconName="keyboard_arrow_left"
                    iconColor="white"
                    onClick={() => this.moinsOffset()} />
                <div
                    ref={i => this.carouselContent = i}
                    style={{height: this.props.contentSize.height, width: this.props.contentSize.width}}
                    data-component="vibe-carousel-content">
                    <div
                        ref={i => this.content = i}
                        data-component="content-list">
                        {this.props.list.map(e => this.renderSlideComponent(e))}
                    </div>
                </div>
                <VibeIconButton
                    style={{
                        backgroundColor: pink500,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        marginLeft: 15,
                        iconStyle: {
                            color: "white"
                        }
                    }}
                    iconName="keyboard_arrow_right"
                    iconColor="white"
                    onClick={() => this.plusOffset()} />
            </div>
        );
    }

    renderSlideComponent(data) {
        const Line = this.props.SlideComponent;
        
        const test: React.CSSProperties = {justifyContent: "center", flexDirection: "column", alignItems: "center"}

        const paperStyle = {
            width: "100%",
            height: "100%",
            flex: "1 0 100%",
            marginRight: "15px",
            padding: 20,
            textAlign: 'center',
            display: 'flex',
            ...test
        };

        return(
            <Motion
                style={{
                transform: spring(this.state.offset) }}>
                {style => (
                    <Paper style={{...paperStyle, transform: `translateX(-${style.transform}px)`}} zDepth={2}>
                        <h4 className="music-title">{data.name}</h4>
                        <img className="music-image" src={require("../../../assets/images/unnamed.jpg")} />
                        <div 
                            data-component="item"
                            ref={(i) => this.getSlideComponentHeight(i)} >
                                <Line data={data} {...this.props.componentProps}/>
                        </div>
                    </Paper>
                    )
                }
            </Motion>
        );
    }

    getSlideComponentHeight(div) {
        if (this.slideComponentHeight === 0) {
            this.slideComponentHeight = div.clientHeight + 150;
        }
    }
}
