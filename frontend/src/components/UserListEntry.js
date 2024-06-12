import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ListItem, ListItemSecondaryAction, Link, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHoriz from '@mui/icons-material/SwapHoriz';
import { Link as RouterLink } from 'react-router-dom';
import { SmartFridgeAPI } from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
