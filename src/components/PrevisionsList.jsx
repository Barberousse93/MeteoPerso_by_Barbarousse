import { Container, Skeleton } from '@mui/material'
import PrevisionJour from './PrevisionJour'
import useTheme from '@mui/material/styles/useTheme'
import usePrevisionList from '../utils/Hooks/usePrevisionList'

function PrevisionsList() {
  const theme = useTheme()

  const { isLoading, error, forecastList, updateDate, insee } = usePrevisionList()

  if (error) return <div>{error}</div>

  return (
    <div>
      {insee !== 0 ? (
        <Container
          id='box'
          sx={{
            border: 1,
            width: '100%',
            borderRadius: '5px',
            p: 2,
            mt: 2,
            [theme.breakpoints.down('md')]: {
              // Styles pour les écrans de taille "900" et inférieurs
              width: '100%',
            },
            [theme.breakpoints.up('md')]: {
              // Styles pour les écrans de taille "900" et supérieurs
              width: '75%',
            },
            [theme.breakpoints.up('lg')]: {
              // Styles pour les écrans de taille "1200" et supérieurs
              width: '50%',
            },
          }}
        >
          {forecastList.map((item, index) =>
            isLoading ? (
              <Skeleton key={index} width='95%' height={100} sx={{ m: 1 }}></Skeleton>
            ) : (
              <PrevisionJour key={index} data={item} />
            ),
          )}
          {isLoading ? (
            <Skeleton variant='p'></Skeleton>
          ) : (
            <p style={{ fontSize: '0.8rem' }}>{updateDate}</p>
          )}
        </Container>
      ) : null}
    </div>
  )
}

export default PrevisionsList
