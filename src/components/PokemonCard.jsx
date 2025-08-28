import React from "react";
import { Zap, Heart, Sword, Shield, Zap as Speed, Weight, Ruler } from "lucide-react";

const PokemonCard = ({ data }) => {
  if (!data) return null;

  // Validate required fields
  const { name, id, height, weight, types, abilities, stats, sprite } = JSON.parse(data);

  if (!name || !id) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        border: '1px solid #fecaca',
        borderRadius: '12px',
        padding: '16px',
        marginTop: '12px',
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap style={{ width: '14px', height: '14px', color: '#dc2626' }} />
          <span style={{ color: '#991b1b', fontSize: '12px', fontWeight: '500' }}>Invalid Pokemon data received</span>
        </div>
      </div>
    );
  }

  // Type color mapping with enhanced colors
  const typeColors = {
    normal: { bg: '#a3a3a3', text: '#ffffff' },
    fire: { bg: '#ef4444', text: '#ffffff' },
    water: { bg: '#3b82f6', text: '#ffffff' },
    electric: { bg: '#eab308', text: '#000000' },
    grass: { bg: '#22c55e', text: '#ffffff' },
    ice: { bg: '#06b6d4', text: '#ffffff' },
    fighting: { bg: '#b91c1c', text: '#ffffff' },
    poison: { bg: '#8b5cf6', text: '#ffffff' },
    ground: { bg: '#ca8a04', text: '#ffffff' },
    flying: { bg: '#6366f1', text: '#ffffff' },
    psychic: { bg: '#ec4899', text: '#ffffff' },
    bug: { bg: '#84cc16', text: '#ffffff' },
    rock: { bg: '#92400e', text: '#ffffff' },
    ghost: { bg: '#7c3aed', text: '#ffffff' },
    dragon: { bg: '#4338ca', text: '#ffffff' },
    dark: { bg: '#374151', text: '#ffffff' },
    steel: { bg: '#6b7280', text: '#ffffff' },
    fairy: { bg: '#f9a8d4', text: '#000000' }
  };

  // Stat icon mapping
  const statIcons = {
    hp: Heart,
    attack: Sword,
    defense: Shield,
    "special-attack": Zap,
    "special-defense": Shield,
    speed: Speed
  };

  // Safe access to optional fields
  const safeTypes = Array.isArray(types) ? types : [];
  const safeAbilities = Array.isArray(abilities) ? abilities : [];
  const safeStats = Array.isArray(stats) ? stats : [];
  const safeHeight = typeof height === 'number' ? height : 0;
  const safeWeight = typeof weight === 'number' ? weight : 0;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fde68a 100%)',
      border: '2px solid #fbbf24',
      borderRadius: '16px',
      padding: '20px',
      marginTop: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-30px',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-20px',
        left: '-20px',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          borderRadius: '50%',
          padding: '8px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <Zap style={{ width: '16px', height: '16px', color: '#ffffff' }} />
        </div>
        <span style={{
          fontSize: '18px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #92400e 0%, #b45309 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Pokémon Info</span>
      </div>

      <div style={{
        display: 'flex',
        gap: '20px',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Pokemon Sprite */}
        {sprite && (
          <div style={{ flexShrink: 0 }}>
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '2px solid #fbbf24',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Sprite container with glow effect */}
              <div style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
              }}>
                <img
                  src={sprite}
                  alt={name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  display: 'none',
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                  borderRadius: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  fontSize: '11px',
                  fontWeight: '500'
                }}>
                  No Image
                </div>
              </div>

              {/* Pokemon ID badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '700',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
              }}>
                #{id.toString().padStart(3, '0')}
              </div>
            </div>
          </div>
        )}

        {/* Pokemon Details */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Header */}
          <div>
            <h3 style={{
              fontSize: window.innerWidth < 768 ? '20px' : '24px',
              fontWeight: '800',
              textTransform: 'capitalize',
              color: '#1f2937',
              marginBottom: '12px',
              lineHeight: 1.1
            }}>
              {name}
            </h3>

            {/* Type badges */}
            {safeTypes.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
                flexWrap: 'wrap'
              }}>
                {safeTypes.map((type) => {
                  const typeStyle = typeColors[type] || typeColors.normal;
                  return (
                    <span
                      key={type}
                      style={{
                        background: typeStyle.bg,
                        color: typeStyle.text,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {type}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Basic Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 640 ? '1fr' : 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #fbbf24',
              boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s ease-in-out'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '50%',
                padding: '8px',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <Ruler style={{ width: '14px', height: '14px', color: '#ffffff' }} />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Height</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937' }}>{(safeHeight / 10).toFixed(1)} m</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #fbbf24',
              boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s ease-in-out'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                borderRadius: '50%',
                padding: '8px',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <Weight style={{ width: '14px', height: '14px', color: '#ffffff' }} />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weight</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937' }}>{(safeWeight / 10).toFixed(1)} kg</div>
              </div>
            </div>
          </div>

          {/* Abilities */}
          {safeAbilities.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #fbbf24',
              boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Abilities</div>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {safeAbilities.map((ability, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                      color: '#1e40af',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      border: '1px solid #93c5fd',
                      boxShadow: '0 1px 2px -1px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {safeStats.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #fbbf24',
              boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Base Stats</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 640 ? '1fr' : 'repeat(2, 1fr)',
                gap: '16px'
              }}>
                {safeStats.map((stat, index) => {
                  const IconComponent = statIcons[stat.name] || Zap;
                  const statValue = stat.value || 0;
                  const maxStat = 255;
                  const percentage = (statValue / maxStat) * 100;

                  // Enhanced stat bar colors
                  const getStatColor = (percentage) => {
                    if (percentage > 80) return '#10b981';
                    if (percentage > 60) return '#f59e0b';
                    if (percentage > 40) return '#f97316';
                    return '#ef4444';
                  };

                  return (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '3px'
                      }}>
                        <div style={{
                          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                          borderRadius: '50%',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <IconComponent style={{ width: '10px', height: '10px', color: '#ffffff' }} />
                        </div>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#374151',
                          textTransform: 'capitalize'
                        }}>
                          {stat.name ? stat.name.replace('-', ' ') : 'unknown'}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#1f2937',
                          minWidth: '24px',
                          textAlign: 'center'
                        }}>
                          {statValue}
                        </span>
                        <div style={{
                          flex: 1,
                          background: '#e5e7eb',
                          borderRadius: '6px',
                          height: '6px',
                          overflow: 'hidden',
                          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}>
                          <div
                            style={{
                              height: '6px',
                              borderRadius: '6px',
                              background: `linear-gradient(90deg, ${getStatColor(percentage)} 0%, ${getStatColor(percentage)}dd 100%)`,
                              width: `${percentage}%`,
                              transition: 'width 0.5s ease-in-out',
                              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
