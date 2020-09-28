const ClubService = require('../clubService');
const Club = require('../../entity/Club');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getClub: jest.fn(),
  getClubs: jest.fn(),
};

const clubService = new ClubService(repositoryMock);

test('Save function with existing ID', async () => {
  const clubTest = new Club({ id: 1 });
  await clubService.save(clubTest);
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  expect(repositoryMock.save).toHaveBeenCalledWith(clubTest);
});

test('Save function with non existing ID', async () => {
  const clubTest = new Club({ id: '' });
  await clubService.save(clubTest);
  expect(clubTest).not.toBe('');
  expect(repositoryMock.save).toHaveBeenCalledTimes(2);
  expect(repositoryMock.save).toHaveBeenCalledWith(clubTest);
});

test('Delete function', async () => {
  const clubTest = new Club({ id: 1 });
  await clubService.delete(clubTest);
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(repositoryMock.delete).toHaveBeenCalledWith(clubTest);
});

test('GetClub function', async () => {
  await clubService.getClub('1');
  expect(repositoryMock.getClub).toHaveBeenCalledTimes(1);
  expect(repositoryMock.getClub).toHaveBeenCalledWith('1');
});

test('GetClubs function', async () => {
  await clubService.getClubs();
  expect(repositoryMock.getClubs).toHaveBeenCalledTimes(1);
});
