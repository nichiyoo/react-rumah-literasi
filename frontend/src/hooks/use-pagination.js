import { useQueryState, parseAsInteger } from 'nuqs';

const useInteger = (key, defaultValue) => {
	const parser = parseAsInteger.withDefault(defaultValue);
	return useQueryState(key, parser);
};

const DEFAULT = { page: 1, limit: 5 };

export const usePagination = (initial = DEFAULT) => {
	const [page, setPage] = useInteger('page', initial.page);
	const [limit, setLimit] = useInteger('limit', initial.limit);

	const goto = (go) => setPage(Math.max(1, go));
	const next = () => setPage((prev) => prev + 1);
	const prev = () => setPage((prev) => Math.max(1, prev - 1));
	const reset = () => setPage(initial.page);

	return {
		page,
		limit,
		setLimit,
		goto,
		next,
		prev,
		reset,
	};
};
