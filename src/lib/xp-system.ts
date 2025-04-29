// XP and level calculations

// Define XP thresholds for each level
export const levelThresholds = {
  Beginner: 0,
  Intermediate: 1000,
  Advanced: 3000,
  Expert: 6000,
}

/**
 * Calculate user level based on XP
 * @param xp - User's current XP
 * @returns The user's level and progress to next level
 */
export function calculateUserLevel(xp: number): {
  level: string
  nextLevel: string | null
  nextLevelXp: number | null
  progress: number
} {
  const levels = Object.keys(levelThresholds)
  const thresholds = Object.values(levelThresholds)

  // Find current level
  let currentLevelIndex = 0
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      currentLevelIndex = i
    } else {
      break
    }
  }

  const currentLevel = levels[currentLevelIndex]
  const nextLevelIndex = currentLevelIndex + 1

  // If user is at max level
  if (nextLevelIndex >= levels.length) {
    return {
      level: currentLevel,
      nextLevel: null,
      nextLevelXp: null,
      progress: 100,
    }
  }

  const nextLevel = levels[nextLevelIndex]
  const nextLevelXp = thresholds[nextLevelIndex]
  const currentLevelXp = thresholds[currentLevelIndex]

  // Calculate progress percentage to next level
  const xpForNextLevel = nextLevelXp - currentLevelXp
  const xpProgress = xp - currentLevelXp
  const progress = Math.min(100, Math.round((xpProgress / xpForNextLevel) * 100))

  return {
    level: currentLevel,
    nextLevel,
    nextLevelXp,
    progress,
  }
}

/**
 * Calculate XP reward based on quiz score and module difficulty
 * @param score - Quiz score percentage (0-100)
 * @param baseXP - Base XP reward for the module
 * @param difficulty - Difficulty multiplier
 * @returns The calculated XP reward
 */
export function calculateXPReward(
  score: number,
  baseXP: number,
  difficulty: "Beginner" | "Intermediate" | "Advanced" = "Beginner",
): number {
  // Difficulty multipliers
  const difficultyMultiplier = {
    Beginner: 1,
    Intermediate: 1.5,
    Advanced: 2,
  }

  // Calculate XP based on score percentage and difficulty
  const scoreMultiplier = score / 100
  const difficultyBonus = difficultyMultiplier[difficulty]

  // Calculate final XP (minimum 10% of base XP even for low scores)
  const calculatedXP = Math.max(Math.round(baseXP * 0.1), Math.round(baseXP * scoreMultiplier * difficultyBonus))

  return calculatedXP
}

