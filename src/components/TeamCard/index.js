import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamsDetails} = props
  const {name, id, teamImageUrl} = teamsDetails

  return (
    <li className="teams-item">
      <Link to={`/team-matches/${id}`} className="link">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
