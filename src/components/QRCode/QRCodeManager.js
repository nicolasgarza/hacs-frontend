import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { URL_PATTERN } from "../forms/utils/validation";
import CloseButton from "../partials/CloseButton";
import HacsQRCode from "./HacsQRCode";

export default function QRCodeManager(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { url: "texashacs.org/" } });

  const [formData, updateFormData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);

  const onSubmit = (data) => {
    updateFormData(data);
    setSubmitted(true);
  };

  const canvasToImage = (qrcode) => {
    return html2canvas(qrcode).then((canvas) => {
      document.getElementById("full-res-qrcode-wrapper").style.display =
        "block";

      // Create image from canvas
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.id = `${formData.name}`;
      img.src = canvas.toDataURL();

      return img;
    });
  };

  const handleDownload = () => {
    const qrcode = document.getElementById("full-res-qrcode");

    var link = document.createElement("a");
    var windowRef;
    if (typeof link.download == "undefined") {
      windowRef = window.open();
    }

    // Download image
    canvasToImage(qrcode).then((img) => {
      link.href = img.src;
      link.download = `${formData.name}.png`;
      link.click();
    });
  };

  const qrcodeDownloadPrepObserver = new MutationObserver((mutations, obs) => {
    const qrcode = document.getElementById("full-res-qrcode");
    if (qrcode && formData) {
      // Disconnect observer
      obs.disconnect();

      // Assign open link for image
      canvasToImage(qrcode).then((img) => {
        const link = document.getElementById("download-qrcode-button-mobile");
        link.href = img.src;
        link.target = "_blank";
      });
      return;
    }
  });

  useEffect(() => {
    qrcodeDownloadPrepObserver.observe(document, {
      childList: true,
      subtree: true,
    });
  }, [formData]);

  return (
    <section className="qrcode-manager">
      <h2 className="form-group-title" onClick={() => setEditing(!editing)}>
        QR Code Generator
      </h2>
      {editing ? (
        <div className="create-qrcode admin-edit">
          {submitted ? (
            <div className="qrcode-display-container flex">
              <HacsQRCode url={formData.url} />
              <div className="flex-row">
                <p className="filename">{formData.name}.png</p>
                <CloseButton icon onClick={() => setSubmitted(false)} />
                <button
                  id="download-qrcode-button"
                  className="button"
                  onClick={handleDownload}
                >
                  Download
                </button>
                <a id="download-qrcode-button-mobile">
                  <button className="button" onClick={handleDownload}>
                    Download
                  </button>
                </a>
              </div>
            </div>
          ) : (
            <form
              id="create-qrcode-form"
              className="form-wrapper"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group">
                <label htmlFor="url">URL</label>
                <p>{errors.url?.message}</p>
                <input
                  id="qrcode-url-edit"
                  className={`form-control-small`}
                  placeholder="ex.: texashacs.org/develop"
                  {...register("url", {
                    required: "A valid URL is required.",
                    pattern: URL_PATTERN,
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">QR Code Name</label>
                <p>{errors.name?.message}</p>
                <input
                  id="qrcode-name-edit"
                  className={`form-control-small`}
                  placeholder="ex.: Newsletter Link"
                  {...register("name", {
                    required: "A name is required.",
                    minLength: {
                      value: 4,
                      message: "Name must be at least 4 characters long.",
                    },
                  })}
                />
              </div>
              <div className="button-container flex-row">
                <button type="submit" className="button">
                  Create
                </button>
                <button className="button" onClick={() => setEditing(!editing)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div onClick={() => setEditing(!editing)}>
          <p>
            <span className="editable">Add QR Code</span>
          </p>
          {/* TODO: Add X mark to close dropdown */}
        </div>
      )}
    </section>
  );
}
