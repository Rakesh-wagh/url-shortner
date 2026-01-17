import { useEffect, useState } from "react";
import API from "../../api/api";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const server_url = process.env.Server_URL;

  const fetchUrls = async () => {
    try {
      const response = await API.get("/urls");
      setUrls(response.data);
    } catch (err) {
      setError("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/urls/${id}`);
      setUrls(urls.filter((url) => url.short_code !== id));
    } catch (err) {
      alert("Failed to delete URL");
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error)
    return <div className="alert alert-danger text-center my-5">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Shorten Url</th>
                <th>Clicks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {urls.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No URLs found.
                  </td>
                </tr>
              ) : (
                urls.map((url) => (
                  <tr key={url.id}>
                    <td>
                      <a
                        href={`${server_url}/urls/${url.short_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {`${server_url}/urls/${url.short_code}`}
                      </a>
                    </td>
                    <td>{url.clicks}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(url.short_code)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UrlList;
