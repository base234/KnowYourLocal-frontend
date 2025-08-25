import React from "react";
import { Zap, Heart, Sword, Shield, Zap as Speed, Weight, Ruler } from "lucide-react";

const PokemonCard = ({ pokemonData }) => {
  if (!pokemonData) return null;

  // Validate required fields
  const { name, id, height, weight, types, abilities, stats, sprite } = pokemonData;

  if (!name || !id) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-red-600" />
          <span className="text-red-800">Invalid Pokemon data received</span>
        </div>
      </div>
    );
  }

  // Type color mapping
  const typeColors = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-700",
    steel: "bg-gray-500",
    fairy: "bg-pink-300"
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
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mt-3 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-5 h-5 text-yellow-600" />
        <span className="font-bold text-yellow-800 text-lg">Pokémon Info</span>
      </div>

      <div className="flex gap-6">
        {/* Pokemon Sprite */}
        {sprite && (
          <div className="flex-shrink-0">
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-yellow-200">
              <img
                src={sprite}
                alt={name}
                className="w-32 h-32 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            </div>
          </div>
        )}

        {/* Pokemon Details */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-2xl font-bold capitalize text-gray-800 mb-1">
              {name} #{id.toString().padStart(3, '0')}
            </h3>

            {/* Type badges */}
            {safeTypes.length > 0 && (
              <div className="flex gap-2 mb-3">
                {safeTypes.map((type) => (
                  <span
                    key={type}
                    className={`${typeColors[type] || 'bg-gray-400'} text-white px-3 py-1 rounded-full text-sm font-semibold capitalize`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-yellow-200">
              <Ruler className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs text-gray-500">Height</div>
                <div className="font-semibold">{(safeHeight / 10).toFixed(1)} m</div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-yellow-200">
              <Weight className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-xs text-gray-500">Weight</div>
                <div className="font-semibold">{(safeWeight / 10).toFixed(1)} kg</div>
              </div>
            </div>
          </div>

          {/* Abilities */}
          {safeAbilities.length > 0 && (
            <div className="bg-white p-3 rounded-lg border border-yellow-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">Abilities</div>
              <div className="flex gap-2">
                {safeAbilities.map((ability, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium capitalize"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {safeStats.length > 0 && (
            <div className="bg-white p-3 rounded-lg border border-yellow-200">
              <div className="text-sm font-semibold text-gray-700 mb-3">Base Stats</div>
              <div className="grid grid-cols-2 gap-3">
                {safeStats.map((stat, index) => {
                  const IconComponent = statIcons[stat.name] || Zap;
                  const statValue = stat.value || 0;
                  const maxStat = 255; // Max possible stat value
                  const percentage = (statValue / maxStat) * 100;

                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-3 h-3 text-gray-600" />
                        <span className="text-xs font-medium text-gray-600 capitalize">
                          {stat.name ? stat.name.replace('-', ' ') : 'unknown'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-800 w-8">
                          {statValue}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              percentage > 80 ? 'bg-green-500' :
                              percentage > 60 ? 'bg-yellow-500' :
                              percentage > 40 ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
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
