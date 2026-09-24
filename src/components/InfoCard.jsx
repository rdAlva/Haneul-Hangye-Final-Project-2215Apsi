import './InfoCard.css'
function InfoCard({ label, value }) {
  return (
    <div className="info-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  )
}

export default InfoCard