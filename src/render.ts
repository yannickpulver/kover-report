import {Coverage, ChangedFilesCoverage} from './types.d'

export const createComment = (
  title: string | undefined,
  coverage: Coverage,
  changedFilesCoverage: ChangedFilesCoverage,
  minCoverageOverall: number | undefined,
  minCoverageChangedFiles: number | undefined
): string => {
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

  return [title ? `### ${title}` : '', changedFilesTable, overallTable]
    .filter(Boolean)
    .join('\n\n')
}

export const renderEmoji = (
  percentage: number,
  minPercentage: number
): string => (percentage >= minPercentage ? ':white_check_mark:|' : ':x:|')
