import * as z from 'zod';

export const itemSchema = z.object({
	isbn: z.string().nonempty(),
	title: z.string().nonempty(),
	author: z.string().nonempty(),
	publisher: z.string().nonempty(),
	year: z.coerce.number(),
	language: z.string().nonempty(),
	amount: z.coerce.number().min(1),
});

export const detailSchema = z.object({
	address_id: z.string().nonempty(),
	package_size: z.enum(['small', 'medium', 'large']),
	estimated_value: z.coerce.number().min(1),
	weight: z.coerce.number().min(1),
	height: z.coerce.number().min(1),
	width: z.coerce.number().min(1),
	depth: z.coerce.number().min(1),
});

export const courierSchema = z.object({
	zipcode: z.string().nonempty(),
	courier_company: z.string().nonempty(),
	courier_type: z.string().nonempty(),
});

export const transactionSchema = z.object({
	items: z.array(itemSchema),
	detail: detailSchema,
	courier: courierSchema,
});
