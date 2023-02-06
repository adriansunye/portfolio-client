import useSkills from '@/services/providers/SkillsProvider'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import SkillCard from './SkillCard'

const Skills = () => {
  const {skills} = useSkills();
  return (
    <React.Fragment>
      <Grid container spacing={2.5} paddingTop={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {skills.map((skill, key) =>

        <Grid key={key} item xs={12} sm={6} md={4} >
            <SkillCard skill={skill} />
        </Grid>
      )}
      </Grid>
    </React.Fragment>

  )
}

export default Skills