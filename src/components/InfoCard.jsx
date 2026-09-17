import './InfoCard.css'
function InfoCard({ label, value }) {
  return (
    <div className="info-card">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default InfoCard