import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Error from "./components/Error";
import Leaderboard from "./components/Leaderboard";
import AdminPanel from "./components/AdminPanel";
import Tickets from "./components/Tickets";
import TicketDetail from "./components/TicketDetail";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:level" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
