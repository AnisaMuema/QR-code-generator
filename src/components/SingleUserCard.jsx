import React from 'react'
import { useState, useRef } from 'react'
import * as htmlToImage from "html-to-image";
import QRCode from 'react-qr-code'


export const SingleUserCard = () => {
    const [url, setUrl] = useState("")
    const [qrlIsVisible, setQrlIsVisible] = useState(false)
    const handleQrCode = () => {
        if(!url){
            return
        }
        setQrlIsVisible(true)
    }


    const qrCodeRef = useRef(null)
    const downloadQRCode = () => {
        htmlToImage
            .toPng(qrCodeRef.current)
            .then(function (dataUrl) {
                const link = document.createElement("a")
                link.href = dataUrl;
                link.download = "qr-code.png"
                link.click()
            })
            .catch(function(error) {
                console.error("Error generating QR code")
            })
    }
    return(
        <div className="qrcode_container">
            <h1>QR Code Generator</h1>
            <div className="qrcode_container--parent" ref={qrCodeRef}>
            <div className="qrcode_input">
                <input 
                    type='text'
                    placeholder='Enter URL...'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button onClick={handleQrCode}>Generate QR Code</button>
            </div> 
            </div>
            {qrlIsVisible && (
                <div className="qrcode_download">
                    <div className="qrcode_image">
                        <QRCode value={url} size={200}/>
                    </div>
                    <button onClick={downloadQRCode}>Download QR Code</button>

                </div>
            )}
        </div>
    )

    

  
}
