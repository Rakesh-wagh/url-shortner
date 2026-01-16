import React, { useState } from 'react';
import API from '../../api/api';

const QRCodeSection = () => {
    const [qrUrl, setQrUrl] = useState("");
    const [qrImage, setQrImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setQrImage(null);
        try {
            const response = await API.post('/urls/qr/', { original_url: qrUrl }, { responseType: 'blob' });
            const url = URL.createObjectURL(response.data);
            setQrImage(url);
        } catch (err) {
            setError('Failed to create QR Code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container ">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h2 className="mb-3">Create a QR Code</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="qrUrl" className="form-label">Enter your QR Code destination</label>
                            <input
                                type="url"
                                className="form-control"
                                id="qrUrl"
                                placeholder="https://example.com/my-long-url"
                                value={qrUrl}
                                onChange={e => setQrUrl(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Generating..." : <>Get your QR Code for free <span className="ms-2">&rarr;</span></>}
                        </button>
                    </form>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {qrImage && (
                        <div className="mt-4 text-center">
                            <img src={qrImage} alt="QR Code" style={{ maxWidth: "100%" }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeSection;
