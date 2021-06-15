import Pagination from '@material-ui/lab/Pagination'
import { FC } from 'react'

type PropsType = {
	isLoading: boolean
	totalCount: number
	handleChange: (arg0: any, arg1: number) => void
	currentPage: number
	portion: number
}

const Paginator: FC<PropsType> = ({ isLoading, totalCount, handleChange, currentPage, portion }) => {
	return (
		<div>
			<Pagination
				disabled={isLoading}
				onChange={handleChange}
				count={Math.ceil(totalCount / portion)}
				page={currentPage}
				color="primary"
			/>
		</div>
	)
}

export default Paginator
