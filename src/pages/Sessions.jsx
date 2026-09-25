import { useEffect, useState } from "react";
import { supabase } from "../db/supabase";
import Navbar from "../components/Navbar";
import SessionItems from "../components/SessionItems";
import "./Sessions.css";

function Sessions() {
  const [recentSessions, setRecentSessions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser);

      if (!currentUser) return;

      const { data: sessions, error: sessionError } = await supabase
        .from("study_sessions")
        .select("duration_minutes")
        .eq("user_id", currentUser.id);

      console.log("Sessions:", sessions);
      console.log("Session error:", sessionError);

      const totalMinutes =
        sessions?.reduce((sum, s) => sum + s.duration_minutes, 0) ?? 0;

      const { data: recentData } = await supabase
        .from("study_sessions")
        .select("activity_type, duration_minutes, session_date, notes")
        .eq("user_id", currentUser.id)
        .order("session_date", { ascending: false })
        .limit(3);

      setRecentSessions(recentData ?? []);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="sessions">
        <h1>Good day, Learner</h1>

        <div className="sessions-box">
          <div className="recent-sessions">
            <h2>Recent Sessions</h2>

            <div className="session-list">
              {recentSessions.map((session, index) => (
                <SessionItems
                  key={index}
                  activityType={session.activity_type}
                  duration={session.duration_minutes}
                  date={session.session_date}
                  notes={session.notes}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Sessions;
