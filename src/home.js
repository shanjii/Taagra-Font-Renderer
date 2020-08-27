import React, { Component } from 'react';
import textToImage from 'text-to-image'
import './style.css'

class Home extends Component {

    constructor() {
        super();
        this.state = {
            text: "",
            img: '',
            fontSize: 100,
            fontFamily: 'TaagraBold',
            maxWidth: 1500,
            lineHeight: 150,
            margin: 0,
        }
    }

    componentDidMount() {
        var text = ""
        textToImage.generate(`\n ${text}`, {
            fontSize: this.state.fontSize,
            fontFamily: this.state.fontFamily,
            maxWidth: this.state.maxWidth,
            lineHeight: this.state.lineHeight,
            bgColor: '#ffffff00',
            margin: this.state.margin,
        }).then((dataUri) => {
            this.setState({ img: dataUri })
        });
    }

    _generateImage = (event) => {
        textToImage.generate(`\n ${event.target.value}`, {
            fontSize: this.state.fontSize,
            fontFamily: this.state.fontFamily,
            maxWidth: this.state.maxWidth,
            bgColor: '#ffffff00',
            lineHeight: this.state.lineHeight,
            margin: this.state.margin,
        }).then((dataUri) => {
            this.setState({ img: dataUri })
        });
    }

    _handleText = (event) => {
        this.setState({ text: event.target.value })
        this._generateImage(event)
    }

    _changeSize = (size) => {
        this.setState({ fontSize: size })
        textToImage.generate(`\n ${this.state.text}`, {
            fontSize: size,
            fontFamily: this.state.fontFamily,
            maxWidth: this.state.maxWidth,
            bgColor: '#ffffff00',
            lineHeight: this.state.lineHeight,
            margin: this.state.margin,
        }).then((dataUri) => {
            this.setState({ img: dataUri })
        });
    }

    _changeFont = (font) => {
        this.setState({ fontFamily: font })
        textToImage.generate(`\n ${this.state.text}`, {
            fontSize: this.state.fontSize,
            fontFamily: font,
            maxWidth: this.state.maxWidth,
            bgColor: '#ffffff00',
            lineHeight: this.state.lineHeight,
            margin: this.state.margin,
        }).then((dataUri) => {
            this.setState({ img: dataUri })
        });
    }

    render() {
        return (
            <section id="main">
                <div className="optionBar">
                    <h1 className="title">Ta'agra Font Renderer</h1>
                    <p className="info1">Type your text here:</p>
                    <textarea rows="5" cols="35" defaultValue="" onChange={this._handleText} />
                    <div className="menu">
                        <p>Ta'agra fonts</p>
                        <div className="optionMenu">
                            <p onClick={() => this._changeFont('TaagraBold')} className="option">Ta'agra Bold</p>
                            <p onClick={() => this._changeFont('TaagraCalligraphy')} className="option">Ta'agra Caligraphy</p>
                            <p onClick={() => this._changeFont('TaagraScratched')} className="option">Ta'agra Scratched</p>
                        </div>
                    </div>
                    <div className="menu">
                        <p>Font size</p>
                        <div className="optionMenu">
                            <p onClick={() => { this._changeSize(100) }} className="option">Large</p>
                            <p onClick={() => { this._changeSize(70) }} className="option">Medium</p>
                            <p onClick={() => { this._changeSize(40) }} className="option">Small</p>
                        </div>
                    </div>
                    <p className="selectedFont">Selected font: '{this.state.fontFamily}'</p>
                    <p className="selectedFont">Selected size: '{this.state.fontSize}px'</p>
                    <br />
                    <div className="downloadButton">
                        <a href={this.state.img} download>Download text as PNG</a>
                    </div>
                </div>
                <div className="resultScreen">
                    <img className="result" src={this.state.img} />
                </div>
                <div className="displayLimit" />
                <p className="warning">RENDER LIMIT!</p>
            </section>
        );
    }
}


export default Home;
