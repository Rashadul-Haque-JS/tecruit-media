import React, { useEffect, useState } from "react";
import { cvTable } from "../database.config";
import FileUploadPdf from "../components/common/FileUploaderPdf";
import UploadButton from "../components/common/buttons/UploadButton";
import VerticalDotsMenu from "../components/common/VerticleDotsMenu";


const JobsMatchWithCV = () => {
  const [pdfData, setPdfData] = useState(null);
  const pdfName = localStorage.getItem("pdfName");
  const [loader, setLoader] = useState(false);

  const fetchPdfFromDatabase = async (pdfName) => {
    try {
      const pdfCV = await cvTable.get({ name: pdfName });
      if (pdfCV) {
        const pdfUrl = pdfCV.data
          ? URL.createObjectURL(
              new Blob([pdfCV.data], { type: "application/pdf" })
            )
          : null;
        setPdfData(pdfUrl);
        console.log(`File "${pdfName}" retrieved from IndexedDB.`);
      } else {
        console.log(`File "${pdfName}" not found in IndexedDB.`);
      }
    } catch (error) {
      console.error("Error getting the file from IndexedDB:", error);
    }
  };

  useEffect(() => {
    if (pdfName) {
      fetchPdfFromDatabase(pdfName);
      console.log("PDF Name: ", pdfName);
    }
  }, [pdfName]);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        setLoader(false);
      }, 5000);
    }
  }, [loader]);

  const handleDelete = async (cvName) => {
    console.log('c00l');
    try {
      const pdfCV = await cvTable.get({ name: cvName });
      if (pdfCV) {
        await cvTable.delete(pdfCV.id);
        localStorage.removeItem('pdfName') // Delete the CV using its ID
        window.location.reload();
        console.log(`CV "${cvName}" removed from IndexedDB.`);
      } else {
        console.log(`CV "${cvName}" not found in IndexedDB.`);
      }
    } catch (error) {
      console.error("Error removing CV from IndexedDB:", error);
    }
  };

  return (
    <div id="top">
      <h1 className="text-2xl 2xl:text-4xl 3xl:text-4xl 4xl:text-5xl font-semibold mb-2 text-center py-8 bg-tecruitPrimary text-tecruitSecondary">
        Job Match
      </h1>
      {loader && pdfData && (
        <>
          <p className="text-center p-4 w-full animate-ping ">SCANNING ...</p>
          <div className="bg-tecruitSpecial absolute inset-0 opacity-25 w-full h-full"></div>
        </>
      )}

      <div className="w-full h-screen flex sm:flex-col-reverse justify-between items-center gap-4 px-2 py-8">
        <div className="sm:w-full md:w-full lg:w-full min-w-1/2 border px-8 h-full relative">
          <VerticalDotsMenu
            options={[
              {
                label: "Delete",
                isDisabled: pdfData ? false: true,
                action: () => handleDelete(pdfName),
              },
            ]}
          />
          <h2 className="text-xl font-semibold pt-8 pb-4">
            Start Scanning for Matches
          </h2>
          <p className="pb-4">
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos.
          </p>
          <p className="pb-4">
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos.
          </p>
          <p className="pb-4">
            lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quos.
          </p>

          <div className="flex justify-start items-center gap-6 py-3">
            <button
              className="bg-tecruitPrimary text-tecruitSecondary px-4 py-2 rounded-md"
              onClick={() => setLoader(true)}
            >
              <a href="#top">Scan Now</a>
            </button>
            {!pdfData && (
              <FileUploadPdf screen="all" children={<UploadButton label="Upload"/>} />
            )}
            {pdfData && (
              <FileUploadPdf screen="all" children={<UploadButton label="Replace"/>} />
            )}
          </div>
        </div>
        {pdfData ? (
          <iframe
            src={pdfData}
            title="PDF Viewer"
            className="pdf-iframe"
          ></iframe>
        ) : (
          <div className="flex justify-center items-center text-md font-medium tracking-wider w-full h-full border">
            <p className="text-center text-gray-500 ">No CV Found ...</p>
          </div>
        )}
      </div>
      <section className="pt-8 pb-32 bg-slate-600">
        <h2 className="text-xl sm:text-lg px-3 pb-8 text-center sm:text-start text-tecruitSecondary">
          CV : AI Optimisation{" "}
        </h2>
        <div className="flex justify-center flex-grow ">
          <img src="/media/ai-world.png" alt="trending" className="h-20%" />
        </div>
      </section>
    </div>
  );
};

export default JobsMatchWithCV;
