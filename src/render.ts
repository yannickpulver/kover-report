import {Coverage, ChangedFilesCoverage} from './types.d'

const getCoverageBadgeColor = (percentage: number): string => {
  if (percentage >= 75) return 'success'
  if (percentage >= 50) return 'yellow'
  return 'critical'
}

const createCoverageBadge = (coverage: Coverage): string => {
  const color = getCoverageBadgeColor(coverage.percentage)
  const percentage = coverage.percentage.toFixed(2)
  return `![Coverage](https://img.shields.io/badge/coverage-${percentage}%25-${color})`
}

export const createComment = (
  coverage: Coverage,
  changedFilesCoverage: ChangedFilesCoverage,
  minCoverageOverall: number | undefined,
  minCoverageChangedFiles: number | undefined
): string => {
  const badge = createCoverageBadge(coverage)

  const changedFilesTable =
    changedFilesCoverage.files.length > 0
      ? [
          `|File|Coverage [${changedFilesCoverage.percentage.toFixed(2)}%]|${
            minCoverageChangedFiles
              ? renderEmoji(
                  changedFilesCoverage.percentage,
                  minCoverageChangedFiles
                )
              : ''
          }`,
          `|:-|:-:|${minCoverageChangedFiles ? ':-:|' : ''}`,
          changedFilesCoverage.files
            .map(
              file =>
                `|[${file.filePath}](${file.url})|${file.percentage.toFixed(2)}%|${
                  minCoverageChangedFiles
                    ? renderEmoji(file.percentage, minCoverageChangedFiles)
                    : ''
                }`
            )
            .join('\n')
        ].join('\n')
      : ''

  const overallTable = [
    `|Total Project Coverage|${coverage.percentage.toFixed(2)}%|${
      minCoverageOverall
        ? renderEmoji(coverage.percentage, minCoverageOverall)
        : ''
    }`,
    `|:-|:-:|${minCoverageOverall ? ':-:|' : ''}`
  ].join('\n')

  return [badge, changedFilesTable].filter(Boolean).join('\n\n')
}

export const renderEmoji = (
  percentage: number,
  minPercentage: number
): string => (percentage >= minPercentage ? ':white_check_mark:|' : ':x:|')
