function SessionItems({ activityType, duration, date, notes }) {
  const icons = {
    'Listening': '🎧',
    'Vocabulary': '📖',
    'Hangul Characters': '🈷️',
    'Speaking': '🎤',
    'Reading': '📚',
    'Writing': '✏️'
  }

  return (
    <div className="session-item">
      <div className="session-left">
        <span className="session-icon">{icons[activityType] ?? '📝'}</span>
        <div className="session-info">
          <span className="session-type">{activityType}</span>
          <span className="session-notes">{notes ?? '—'}</span>
        </div>
      </div>
      <div className="session-right">
        <span className="session-duration">{duration} min</span>
        <span className="session-date">{date}</span>
      </div>
    </div>
  )
}

export default SessionItems