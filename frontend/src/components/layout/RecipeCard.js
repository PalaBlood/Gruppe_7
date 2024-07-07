import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KitchenIcon from '@mui/icons-material/Kitchen';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme, isAvailable }) => ({
  padding: theme.spacing(2),
  border: isAvailable ? '3px solid green' : '1px solid gray', // Randfarbe basierend auf Verfügbarkeit
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const StyledIcon = styled('span')(({ theme }) => ({
  fontSize: 24,
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  [theme.breakpoints.down('sm')]: {
    fontSize: 10,
  },
  display: 'flex',
  justifyContent: 'center',
  alignContent: "center" 
}));

function RecipeCard({ recipe, onEdit, onDelete, onViewEntries, onCook, isAvailable }) {
  return (
    <StyledCard isAvailable={isAvailable}>
      <CardContent>
        <Typography variant="h5">{recipe.getTitle()}</Typography>
        <Typography color="textSecondary">
          Portions: {recipe.getNumberOfPersons()} <br />
          Description: {recipe.getDescription()}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={1}>

        <Grid item xs={12} sm={6} md={3}>
            <StyledButton
              size="small"
              startIcon={<KitchenIcon className={StyledIcon} />}
              onClick={() => onViewEntries(recipe.getId())}
              fullWidth
            >
              Show <br></br> ingredients
            </StyledButton>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledButton
              size="small"
              startIcon={<EditIcon className={StyledIcon} />}
              onClick={() => onEdit(recipe)}
              fullWidth
            >
              Customize <br></br> recipe
            </StyledButton>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledButton
              size="small"
              startIcon={<OutdoorGrillIcon className={StyledIcon} />}
              onClick={() => onCook(recipe)}
              fullWidth
            >
              Cook recipe
            </StyledButton>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledButton
              size="small"
              startIcon={<DeleteIcon className={StyledIcon} />}
              onClick={() => onDelete(recipe)}
              fullWidth
            >
              Delete
            </StyledButton>
          </Grid>
          
         

        </Grid>
      </CardActions>
    </StyledCard>
  );
}

export default RecipeCard;
