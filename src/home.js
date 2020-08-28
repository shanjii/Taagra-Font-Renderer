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
            lineHeight: 180,
            margin: 0,
        }
    }
    //Preload image generator (Image generator will not render the first custom font character without this)
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
    //Update a new image on text change
    _handleText = (event) => {
        this.setState({ text: event.target.value })
        this._generateImage(event)
    }
    //Generate image from text values and font configurations
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
    //Update the generated image when changing font sizes
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
    //Reset the text value on font change (Custom font will not be generated correctly without this)
    _changeFont = (font) => {
        this.setState({ fontFamily: font })
        this.setState({ text: '' })
        textToImage.generate(`\n ${''}`, {
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
                    <textarea placeholder="Type here *" value={this.state.text} rows="5" cols="35" onChange={this._handleText} />
                    <p className="renderWarning">* Maximum render of 5 rows</p>
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
                    <div className="optionMenuMobile">
                        <p className="info3">*SELECT YOUR FONT BEFORE INPUTING ABOVE*</p>
                    </div>
                    <div className="optionMenuMobile">
                        <p onClick={() => this._changeFont('TaagraBold')} className="option">Ta'agra Bold</p>
                        <p onClick={() => this._changeFont('TaagraCalligraphy')} className="option">Ta'agra Caligraphy</p>
                        <p onClick={() => this._changeFont('TaagraScratched')} className="option">Ta'agra Scratched</p>
                    </div>
                    <div className="optionMenuMobile">
                        <p className="info3">Font sizes</p>
                    </div>
                    <div className="optionMenuMobile">
                        <p onClick={() => { this._changeSize(100) }} className="option">Large</p>
                        <p onClick={() => { this._changeSize(70) }} className="option">Medium</p>
                        <p onClick={() => { this._changeSize(40) }} className="option">Small</p>
                    </div>
                    <p className="selectedFont">Selected font: '{this.state.fontFamily}'</p>
                    <p className="selectedFont">Selected size: '{this.state.fontSize}px'</p>
                    <br />
                    <div className="downloadButton">
                        <a href={this.state.img} download="generated_taagra">Download text as PNG</a>
                    </div>
                </div>
                <div className="resultScreen">
                    <img className="result" src={this.state.img} />
                </div>
            </section>
        );
    }
}


export default Home;
