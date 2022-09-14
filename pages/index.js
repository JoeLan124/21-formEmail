import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [pnr, setPnr] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [orga, setOrga] = useState("");
  const [telefon, setTelefon] = useState("");
  const [surnameV, setSurnameV] = useState("");
  const [pnrV, setPnrV] = useState("");
  const [typenew, setTypenew] = useState(false);
  const [typedelete, setTypedelete] = useState(false);
  const [typeupdate, setTypeupdate] = useState(false);

  return (
    <div>
      <Head>
        <title>SendEmail</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center border-2 border-gray-300 m-4 shadow-xl rounded-xl">
        <div className="mx-10 mt-10 mx-auto w-1/1 text-left">
          <h1 className="font-extrabold text-2xl mb-4">
            Beantragung neue Berechtigung
          </h1>
          <p className="underline">Beachten Sie folgende Hinweise</p>
          <p className="text-left mt-2">
            Bitte füllen Sie das Formular aus und klicken Sie anschießend auf
            senden.
          </p>
          <p className="mt-2 text-left font-semibold">Angaben für:</p>
        </div>

        <form
          className="mt-4 "
          onSubmit={async (e) => {
            e.preventDefault();
            await fetch("/api/sendmail", {
              body: JSON.stringify({
                firstname,
                surname,
                pnr,
                email,
                description,
                orga,
                telefon,
                surnameV,
                pnrV,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            });
          }}
        >
          <div className="ml-36 items-center mb-5 rounded-lg bg-gradient-to-r from-slate-300 to-white mr-36">
            <div className="m-4 text-left">
              <div className=" mr-2">Vorname: </div>
              <input
                onChange={(e) => setFirstname(e.target.value)}
                className="border p-1 text-black mb-4 w-72"
                required
              />

              <div className="mr-2">Nachname:</div>
              <input
                onChange={(e) => setSurname(e.target.value)}
                className="border p-1 text-black mb-4 w-72"
                required
              />
              <div className="">Personalnummer:</div>
              <input
                onChange={(e) => setPnr(e.target.value)}
                className="border p-1 text-black mb-4 w-72"
                required
              />
              <div className="flex-1">Email:</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="border p-1 text-black mb-4 w-72"
                required
              />
              <div className="flex-1">Orga-Einheit:</div>
              <input
                onChange={(e) => setOrga(e.target.value)}
                className="border p-1 text-black mb-4 w-72"
                required
              />
              <div className="flex-1">Telefon:</div>
              <input
                onChange={(e) => setTelefon(e.target.value)}
                className="border p-1 text-black mb-4 w-72"
                required
              />
            </div>
          </div>
          <p className="mt-2 ml-10 mb-4 text-left font-semibold">
            Angaben zum Vorgesetzten:
          </p>
          <div className="ml-36 rounded-lg items-center mb-5 bg-gradient-to-r from-slate-300 to-white mr-36 text-left">
            <div className="ml-4 mr-2">Nachname Vorgesetzer:</div>
            <input
              onChange={(e) => setSurnameV(e.target.value)}
              className="ml-4 border p-1 text-black mb-4 w-72"
              required
            />
            <div className=" first-letter:ml-4 mr-2">
              Personalnummer Vorgesetzter:
            </div>
            <input
              onChange={(e) => setPnrV(e.target.value)}
              className="ml-4 border p-1 text-black mb-4 w-72"
              required
            />
          </div>

          <p className="mt-2 ml-10 mb-4 text-left font-semibold">
            Art der Berechtigung:
          </p>
          <div className="ml-36 mb-5 rounded-lg bg-gradient-to-r from-slate-300 to-white mr-36 flex">
            <div className="ml-2 mr-6">
              <label className="text-black mx-2 items-center">Neuanlage:</label>
              <input
                unchecked
                id="default-radio-2"
                type="radio"
                name="default-radio"
                onChange={(e) => {
                  setTypedelete(e.target);
                  setTypeupdate(false);
                }}
                className="w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="">
              <label className="text-black mx-2 items-center">Löschung:</label>
              <input
                unchecked
                id="default-radio-2"
                type="radio"
                name="default-radio"
                onChange={(e) => {
                  setTypedelete(e.target);
                  setTypeupdate(false);
                }}
                className="mr-6 w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="">
              <label className="text-black mx-2 items-center">Änderung</label>
              <input
                unchecked
                id="default-radio-2"
                type="radio"
                name="default-radio"
                onChange={(e) => setTypeupdate(e.target)}
                className="w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          {typeupdate && (
            <div>
              <div className="ml-36 mb-5 h-48 rounded-lg bg-gradient-to-r from-slate-300 to-white mr-36 flex">
                <label className="text-black -ml-4 mt-2 ">
                  Grund für Änderung:
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-1 text-black resize-none my-2 h-36 w-full "
                />
              </div>
            </div>
          )}

          <div>
            <button className="bg-green-300 text-white hover:bg-green-500 rounded-lg px-4 py-2 mb-8 mr-4 ">
              Senden
            </button>
            <input
              className={`border rounded px-8 py-2 mt-10 font-bold inline-block`}
              type="reset"
              value="zurücksetzen"
              onChange={(e) => {
                setTypeupdate(false);
                setTypenew(false);
                setTypedelete(false);
              }}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
