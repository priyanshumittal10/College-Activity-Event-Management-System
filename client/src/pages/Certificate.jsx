import { useEffect, useState } from "react";
import api from "../api/axios";

const Certificate = () => {
  const [certs, setCerts] = useState([]);

  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name") || "Student";

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await api.get("/registrations");

        const today = new Date();

        // ✅ FILTER WITH DATE CHECK
        const filtered = res.data.filter((r) => {
          const eventDate = new Date(r.eventId?.date);

          return (
            r.userId?._id === userId &&
            r.attended === true &&
            eventDate <= today // 🔥 DATE VALIDATION
          );
        });

        setCerts(filtered);

      } catch (err) {
        console.log(err);
      }
    };

    fetchCerts();
  }, []);

  const downloadPDF = (id) => {
    const element = document.getElementById(`cert-${id}`);

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <style>
            body{
              margin:0;
              display:flex;
              justify-content:center;
              align-items:center;
              height:100vh;
              font-family: Arial, sans-serif;
              background:white;
            }

            .cert{
              border:12px solid #d4af37;
              padding:60px;
              width:900px;
              text-align:center;
            }

            .logo{
              width:80px;
              margin-bottom:10px;
            }

            h1{font-size:36px;}
            h2{font-size:28px;color:#4f46e5;}
            h3{font-size:22px;}
            p{font-size:18px;}

            .footer{
              margin-top:50px;
              display:flex;
              justify-content:space-between;
            }

            .line{
              border-top:1px solid black;
              width:200px;
              margin-top:20px;
            }
          </style>
        </head>

        <body>
          <div class="cert">
            ${element.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 px-6 py-10">

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          🎓 Certificates
        </h1>
        <p className="text-gray-600 mt-2">
          Download your participation certificates
        </p>
      </div>

      {certs.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No certificates available yet
        </p>
      ) : (
        <div className="space-y-12 flex flex-col items-center">

          {certs.map((c) => (
            <div key={c._id} className="flex flex-col items-center">

              <div
                id={`cert-${c._id}`}
                className="bg-white border-[12px] border-yellow-500 p-12 w-[900px] text-center shadow-2xl rounded-lg"
              >

                <img
                  src="/logo.png"
                  alt="logo"
                  className="mx-auto mb-4 w-20"
                />

                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Certificate of Participation
                </h1>

                <p className="text-gray-600 text-lg">
                  This is proudly presented to
                </p>

                <h2 className="text-3xl font-semibold mt-3 text-indigo-700">
                  {name}
                </h2>

                <p className="text-gray-600 mt-6 text-lg">
                  for successfully participating in
                </p>

                <h3 className="text-2xl font-semibold text-gray-800 mt-2">
                  {c.eventTitle}
                </h3>

                <div className="flex justify-between mt-12 text-sm text-gray-600">
                  <div>
                    <div className="border-t border-gray-500 w-40 mx-auto"></div>
                    <p className="mt-2">Faculty Coordinator</p>
                  </div>

                  <div>
                    <div className="border-t border-gray-500 w-40 mx-auto"></div>
                    <p className="mt-2">Director</p>
                  </div>
                </div>

              </div>

              <button
                onClick={() => downloadPDF(c._id)}
                className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transition"
              >
                Download Certificate
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Certificate;