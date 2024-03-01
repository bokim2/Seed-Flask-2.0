import React from 'react'

export default function AllSerialDilutionsSummary({dilutionsSummary, dilutionSettings}) {

    const totalDilutionFactor = dilutionsSummary.map(el => el.dilutionFactor).reduce((acc, curr)=> acc * curr, 1);
  return (
    <div>
    <p>totalDilutionFactor: {totalDilutionFactor}</p>
    <p>OD600: {totalDilutionFactor * dilutionSettings[dilutionSettings.length-1].OD600Reading}</p>
    </div>
  )
}
