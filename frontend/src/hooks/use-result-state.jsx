import * as React from 'react';

const useResultState = (error, loading, data) => {
	const { result, empty } = React.useMemo(() => {
		if (error || loading) {
			return {
				result: [],
				empty: false,
			};
		}

		return {
			result: data.data,
			empty: data.data.length === 0,
		};
	}, [error, loading, data]);

	return { result, empty };
};

export { useResultState };
