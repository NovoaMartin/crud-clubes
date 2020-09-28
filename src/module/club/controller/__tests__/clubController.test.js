const ClubController = require('../clubController');
const Club = require('../../entity/Club');

const clubServiceMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getClub: jest.fn(() => Promise.resolve({})),
  getClubs: jest.fn(() => Promise.resolve([])),
};

const clubController = new ClubController(clubServiceMock, {});

test('Index function', async () => {
  const renderMock = jest.fn();
  await clubController.index({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('base', {
    layout: 'base',
    data: {
      clubs: [],
    },
  });
});

test('Retrieve function', async () => {
  const renderMock = jest.fn();
  await clubController.retrieve({ params: { team: 1 } }, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('club', {
    layout: 'base',
    data: {
      club: {},
    },
  });
});

test('Create function', async () => {
  const renderMock = jest.fn();
  await clubController.create({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('clubCreate', {
    layout: 'base',
  });
});

test('Update function', async () => {
  const renderMock = jest.fn();
  await clubController.update({ params: { team: 1 } }, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('clubEdit', {
    layout: 'base',
    data: {
      club: {},
    },
  });
});

test('Delete function', async () => {
  const redirectMock = jest.fn();

  await clubController.delete({ params: { team: 1 } }, { redirect: redirectMock });

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith(clubController.ROUTE);
  expect(clubServiceMock.delete).toHaveBeenCalledTimes(1);
  expect(clubServiceMock.delete).toHaveBeenCalledWith(1);
});

test('Save function', async () => {
  const testCrestUrl = 'public\\img\\crests\\testcrest.jpg';
  const testClub = new Club({
    id: 74,
    area: {
      id: 2072,
      name: 'England',
    },
    name: 'West Bromwich Albion FC',
    shortName: 'West Brom',
    tla: 'WBA',
    crestUrl: '',
    address: 'The Hawthorns West Bromwich B71 4LF',
    phone: null,
    website: 'http://www.wba.co.uk',
    email: 'enquiries@wbafc.co.uk',
    founded: 1879,
    clubColors: 'White / Navy Blue',
    venue: 'The Hawthorns',
  });
  const redirectMock = jest.fn();

  await clubController.save({ body: testClub, file: { path: testCrestUrl } }, { redirect: redirectMock });

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith(clubController.ROUTE);
  expect(clubServiceMock.save).toHaveBeenCalledTimes(1);
  testClub.crestUrl = 'img\\crests\\testcrest.jpg';
  expect(clubServiceMock.save).toHaveBeenCalledWith(testClub);
});

test('configureRoutes function', async () => {

});
