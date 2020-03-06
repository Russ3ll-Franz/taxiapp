import * as path from 'path';

export const imageFileFilter = (req, file: any, callback) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return callback(new Error('Only image files are allowed!'), false);
	}
	callback(null, true);
};

export const editFileName = (req, file: any, callback) => {
	const name = new Date().getTime().toString();
	const fileExtName = path.extname(file.originalname);
	callback(null, `${name}${fileExtName}`);
};