import React, { useState } from 'react';
import { RoomMember } from '../hooks/useRoomState';
import '../styles/TeamSelectionModal.css';

interface TeamSelectionModalProps {
  members: RoomMember[];
  onConfirm: (team0: string[], team1: string[]) => void;
  onCancel: () => void;
}

const TeamSelectionModal: React.FC<TeamSelectionModalProps> = ({
  members,
  onConfirm,
  onCancel,
}) => {
  const [team0, setTeam0] = useState<string[]>([]);
  const [team1, setTeam1] = useState<string[]>([]);

  const unassigned = members.filter(
    m => !team0.includes(m.userId) && !team1.includes(m.userId)
  );

  const getMemberName = (userId: string) => {
    const member = members.find(m => m.userId === userId);
    return member?.name || userId;
  };

  const assignToTeam0 = (userId: string) => {
    if (team0.length >= 2) return;
    setTeam1(team1.filter(id => id !== userId));
    setTeam0([...team0, userId]);
  };

  const assignToTeam1 = (userId: string) => {
    if (team1.length >= 2) return;
    setTeam0(team0.filter(id => id !== userId));
    setTeam1([...team1, userId]);
  };

  const removeFromTeam0 = (userId: string) => {
    setTeam0(team0.filter(id => id !== userId));
  };

  const removeFromTeam1 = (userId: string) => {
    setTeam1(team1.filter(id => id !== userId));
  };

  const canConfirm = team0.length === 2 && team1.length === 2;

  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm(team0, team1);
    }
  };

  return (
    <div className="team-modal-overlay">
      <div className="team-modal">
        <div className="team-modal__header">
          <h3>Izaberi Timove za 2v2 Party</h3>
          <button className="team-modal__close" onClick={onCancel}>✕</button>
        </div>

        <div className="team-modal__content">
          {/* Unassigned Players */}
          {unassigned.length > 0 && (
            <div className="team-modal__unassigned">
              <h4>Nedodijeljeni Igrači</h4>
              <ul className="player-list">
                {unassigned.map(member => (
                  <li key={member.userId} className="player-list__item">
                    <span>{member.name}</span>
                    <div className="player-list__actions">
                      <button
                        className="player-list__btn player-list__btn--team0"
                        onClick={() => assignToTeam0(member.userId)}
                        disabled={team0.length >= 2}
                      >
                        Tim 0
                      </button>
                      <button
                        className="player-list__btn player-list__btn--team1"
                        onClick={() => assignToTeam1(member.userId)}
                        disabled={team1.length >= 2}
                      >
                        Tim 1
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Team 0 */}
          <div className="team-modal__team team-modal__team--0">
            <h4>Tim 0 ({team0.length}/2)</h4>
            <ul className="team-list">
              {team0.map(userId => (
                <li key={userId} className="team-list__item">
                  <span>{getMemberName(userId)}</span>
                  <button
                    className="team-list__remove"
                    onClick={() => removeFromTeam0(userId)}
                  >
                    ✕
                  </button>
                </li>
              ))}
              {team0.length < 2 && (
                <li className="team-list__item team-list__item--empty">
                  Prazno mjesto
                </li>
              )}
            </ul>
          </div>

          {/* Team 1 */}
          <div className="team-modal__team team-modal__team--1">
            <h4>Tim 1 ({team1.length}/2)</h4>
            <ul className="team-list">
              {team1.map(userId => (
                <li key={userId} className="team-list__item">
                  <span>{getMemberName(userId)}</span>
                  <button
                    className="team-list__remove"
                    onClick={() => removeFromTeam1(userId)}
                  >
                    ✕
                  </button>
                </li>
              ))}
              {team1.length < 2 && (
                <li className="team-list__item team-list__item--empty">
                  Prazno mjesto
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="team-modal__footer">
          {!canConfirm && (
            <p className="team-modal__hint">
              Dodijeli po 2 igrača svakom timu da nastaviš
            </p>
          )}
          <button
            className="team-modal__confirm"
            onClick={handleConfirm}
            disabled={!canConfirm}
          >
            Potvrdi Timove
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamSelectionModal;
