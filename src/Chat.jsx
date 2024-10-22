import { useState } from "react";
import "./App.css";
import axios from "axios";

function Chat() {
  const [metal, setMetal] = useState("");
  const [conc, setConc] = useState();
  const [source, setSource] = useState("");

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://hmd-b9cw.onrender.com";

  const getDataFromBackend = async () => {
    try {
      setLoading(true);
      const endpoint = `${API_URL}/?concentration=${conc}&metal=${metal}&source=${source}`;
      const res = await axios.get(endpoint);
      console.log(res.data);
      setResponse(res.data);
      setLoading(false);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {response == null ? (
        loading ? (
          <LoadingIndicator />
        ) : null
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold text-center">
              <p>{response.label}</p>
              <p>Drinkability Score: {response.drinkability_score}</p>
            </h2>
          </div>

          <div className="flex flex-col gap-3 px-3">
            <h2>Purification steps for factories</h2>
            {response.purification_steps_for_factories.map((step, index) => (
              <div className="bg-green-200 rounded-lg p-4 border-2 border-green-400">
                <h1 className="text-lg font-bold">{step.title}</h1>
                <h2 className="text-md">{step.description}</h2>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 px-3">
            <h2>Purification steps for houses</h2>
            {response.purification_steps_for_houses.map((step, index) => (
              <div className="bg-green-200 rounded-lg p-4 border-2 border-green-400">
                <h1 className="text-lg font-bold">{step.title}</h1>
                <h2 className="text-md">{step.description}</h2>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 px-3">
            <h2>Ways to fix the source of your water</h2>
            {response.ways_to_fix_source.map((way, index) => (
              <div className="bg-green-200 rounded-lg p-4 border-2 border-green-400">
                <h1 className="text-lg font-bold">{way.title}</h1>
                {way.description.map((desc, index) => (
                  <h2 className="text-md">
                    {index + 1}. {desc}
                  </h2>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <input
          placeholder="Metal Name"
          type="text"
          value={metal}
          onChange={(e) => setMetal(e.target.value)}
          className="border-2 rounded-full border-green-600 px-2 py-1"
        />
        <input
          placeholder="Concentration"
          type="text"
          value={conc}
          onChange={(e) => setConc(e.target.value)}
          className="border-2 rounded-full border-green-600 px-2 py-1 "
        />
        <input
          placeholder="Source of Water"
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border-2 rounded-full border-green-600 px-2 py-1 "
        />
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={getDataFromBackend}
          className="flex flex-col justify-center border rounded-lg bg-green-200 px-3 py-1 border-2 border-green-400"
        >
          get res
        </button>
      </div>
    </>
  );
}

const LoadingIndicator = () => {
  return <p>loading..</p>;
};

export default Chat;
