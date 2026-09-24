import { useEffect, useState } from "react";
import { supabase } from "../db/supabase";
import InfoCard from "../components/InfoCard";
import Navbar from "../components/Navbar";
import SessionItems from "../components/SessionItems";
import "./Dashboard.css";

function Dashboard() {
  const [wordsLearned, setWordsLearned] = useState(0);
  const [hoursStudied, setHoursStudied] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [recentSessions, setRecentSessions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser);

      console.log("Current user ID:", currentUser?.id);

      if (!currentUser) return;

      const { count: wordCount, error: wordError } = await supabase
        .from("vocabulary_words")
        .select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id);

      console.log("Word count:", wordCount);
      console.log("Word error:", wordError);

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

      setWordsLearned(wordCount ?? 0);
      setHoursStudied(Math.floor(totalMinutes / 60));
      setTotalSessions(sessions?.length ?? 0);
      setRecentSessions(recentData ?? []);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="dashboard">
        <h1>Good day, Learner</h1>
        <div className="dashboard-box">
          <div className="dashboard-overview">
            <p>Here's your study overview for this week.</p>
            <span className="korean-praise">잘했어요!</span>
          </div>
          <div className="info-cards">
            <InfoCard label="Words Learned" value={wordsLearned} />
            <InfoCard label="Hours Studied" value={hoursStudied} />
            <InfoCard
              label="Total Sessions"
              value={totalSessions}
            />
          </div>
          <div className="recent-sessions">
            <h2>Recent Sessions</h2>
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
      </main>
    </div>
  );
}

export default Dashboard;
