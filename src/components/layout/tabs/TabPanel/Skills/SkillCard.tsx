import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const SkillCard = ({skill}: any) => {
    return (
        <Card sx={{ maxWidth: 500, px: 1,  minHeight:500, display:'flex', flexDirection:'column',justifyContent:'end'}}>
            <CardHeader
                title={skill.name}
            />
            <CardMedia
                component="img"
                image={skill.image}
                sx={{  margin: 'auto',
                display: 'block',
                maxWidth: '270px',
                maxHeight: '270px',
                borderRadius: '16px' }}
                alt="Skill image"
            />
            <CardContent sx={{mt: 2, }}>
                <Typography variant="subtitle1" color="text.primary">
                    {skill.experience}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SkillCard