import { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const Shorten = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post(`/urls/shorten`, {
        original_url: e.target.longUrl.value,
        custom_code: e.target.customCode.value || undefined,
      });
      if (response.status === 200) {
        navigate("/urls");
      }
    } catch (err) {
      alert("Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <h2>Create a Short Link</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="longUrl" className="form-label">
              Enter your long URL
            </label>
            <input
              type="url"
              className="form-control"
              id="longUrl"
              name="longUrl"
              placeholder="https://example.com/my-long-url"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="customCode" className="form-label">
              Custom short code (optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="customCode"
              name="customCode"
              placeholder="e.g. my-custom-link"
            />
            <small className="text-muted">
              Leave blank to auto-generate a code.
            </small>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Get your Short Link"}{" "}
            <span className="ms-2">&rarr;</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shorten;
